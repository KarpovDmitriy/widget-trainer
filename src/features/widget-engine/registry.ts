import type { WidgetModelMap } from '@src/types/widget.types';
// Register all built-in strategies
import { codeOrderingStrategy } from './strategies/code-ordering/codeOrderingStrategy.config';
import { quizStrategy } from './strategies/quiz/quizStrategy.config';
import { trueFalseStrategy } from './strategies/true-false/trueFalseStrategy.config';
import type { AnyWidgetStrategy, RegisteredStrategy } from './types';

//  Strategy registry - a map from widget type string to its strategy.
//
//  Adding a new widget type:
//  1. Create a new strategy component in ./strategies/
//  2. Create a .config.ts with the strategy object
//  3. Import and call `registerStrategy()` below
//  4. Update WidgetType union and WidgetModelMap in widget.types.ts

const strategies = new Map<keyof WidgetModelMap, AnyWidgetStrategy>();

export function registerStrategy(strategy: AnyWidgetStrategy): void {
  if (strategies.has(strategy.type)) {
    console.warn(`[WidgetEngine] Strategy "${strategy.type}" is already registered, overwriting.`);
  }
  strategies.set(strategy.type, strategy);
}

export function getStrategy<K extends keyof WidgetModelMap>(type: K): RegisteredStrategy<K> | undefined {
  return strategies.get(type) as RegisteredStrategy<K> | undefined;
}

export function getRegisteredTypes(): (keyof WidgetModelMap)[] {
  return Array.from(strategies.keys());
}

registerStrategy(quizStrategy);
registerStrategy(codeOrderingStrategy);
registerStrategy(trueFalseStrategy);
