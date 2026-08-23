import * as fc from 'fast-check';
import { renderHook, act } from '@testing-library/react';
import { calculateTypewriterText } from '../useTypewriter';
import { calculateShuffleText } from '../useCharacterShuffle';
import { useDescriptorQueue } from '../useDescriptorQueue';
import { useAnimationOrchestrator, PHASES } from '../useAnimationOrchestrator';

describe('Custom Hooks Property-Based Tests', () => {
  /**
   * Property 1: Typewriter produces increasing prefixes
   * For any input string of length N, at any point during the typewriter animation,
   * the displayed text SHALL be a prefix of the target string, and the character count
   * SHALL only increase monotonically over time.
   * Validates: Requirements 3.1, 3.3
   */
  test('Property 1: Typewriter produces increasing prefixes monotonically', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 500 }),
        fc.integer({ min: 100, max: 2000 }),
        fc.integer({ min: 0, max: 2500 }),
        (text, duration, elapsed) => {
          const result = calculateTypewriterText(text, duration, elapsed, 'forward');

          // Must be a valid prefix of the original string
          expect(text.startsWith(result.displayText)).toBe(true);

          // If elapsed >= duration, it should be complete and match full text
          if (elapsed >= duration) {
            expect(result.displayText).toBe(text);
            expect(result.isComplete).toBe(true);
          }

          // Monotonicity check across two timepoints t1 <= t2
          const t2 = elapsed + 50;
          const result2 = calculateTypewriterText(text, duration, t2, 'forward');
          expect(result2.displayText.length).toBeGreaterThanOrEqual(result.displayText.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Character shuffle resolves to target
   * For any source string and target string, after the shuffle animation completes,
   * the displayed text SHALL exactly equal the target string.
   * Validates: Requirements 6.1
   */
  test('Property 2: Character shuffle resolves to target on completion', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 100 }),
        fc.integer({ min: 100, max: 1000 }),
        (targetText, duration) => {
          // At completion (elapsed >= duration)
          const result = calculateShuffleText(targetText, duration, duration);
          expect(result.displayText).toBe(targetText);
          expect(result.isComplete).toBe(true);

          // During intermediate progress, length matches target length
          const intermediateResult = calculateShuffleText(targetText, duration, duration / 2);
          expect(intermediateResult.displayText.length).toBe(targetText.length);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Descriptor queue produces unique items in FIFO order
   * For any sequence of N draws (where N <= array length) from the descriptor queue
   * without a reset, all drawn items SHALL be unique, and each item SHALL be drawn
   * from the front with previously-shown items appended to the back.
   * Validates: Requirements 6.2, 6.3
   */
  test('Property 3: Descriptor queue produces unique items in FIFO order', () => {
    fc.assert(
      fc.property(
        fc.uniqueArray(fc.string({ minLength: 1, maxLength: 30 }), {
          minLength: 4,
          maxLength: 15,
        }),
        (items) => {
          const { result } = renderHook(() =>
            useDescriptorQueue(items, ['End 1', 'End 2'], items.length)
          );

          const seen = [result.current.current];

          // Draw items.length - 1 more times
          for (let i = 1; i < items.length; i++) {
            act(() => {
              result.current.next();
            });
            seen.push(result.current.current);
          }

          // All drawn items should be unique and match initial items order
          expect(new Set(seen).size).toBe(items.length);
          expect(seen).toEqual(items);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Shuffler reset restores initial state
   * For any game state (regardless of tap count or current position), calling reset
   * SHALL restore the descriptor queue to its original order and reset tap count.
   * Validates: Requirements 6.6
   */
  test('Property 4: Shuffler reset restores initial state', () => {
    fc.assert(
      fc.property(
        fc.uniqueArray(fc.string({ minLength: 1, maxLength: 30 }), {
          minLength: 5,
          maxLength: 10,
        }),
        fc.integer({ min: 1, max: 20 }),
        (items, tapCount) => {
          const { result } = renderHook(() =>
            useDescriptorQueue(items, ['End 1', 'End 2'], 8)
          );

          // Tap randomly
          for (let i = 0; i < tapCount; i++) {
            act(() => {
              result.current.next();
            });
          }

          // Reset
          act(() => {
            result.current.reset();
          });

          // Verify reset state
          expect(result.current.current).toBe(items[0]);
          expect(result.current.tapCount).toBe(0);
          expect(result.current.isGameOver).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Animation plays exactly once per component mount
   * Entrance animation sequence executes at most once per mount;
   * advancePhase transitions to complete and stays complete.
   * Validates: Requirements 8.1, 8.2
   */
  test('Property 6: Animation plays exactly once per component mount', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 4, max: 20 }),
        (advanceCalls) => {
          const { result } = renderHook(() => useAnimationOrchestrator(false));

          expect(result.current.currentPhase).toBe(PHASES.TYPEWRITER);

          // Advance multiple times
          for (let i = 0; i < advanceCalls; i++) {
            act(() => {
              result.current.advancePhase();
            });
          }

          expect(result.current.currentPhase).toBe(PHASES.COMPLETE);
        }
      ),
      { numRuns: 100 }
    );
  });
});
