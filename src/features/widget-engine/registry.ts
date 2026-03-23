import type { WidgetType } from '@src/types/widget.types';
// Register all built-in strategies
import { codeOrderingStrategy } from './strategies/codeOrderingStrategy.config';
import { quizStrategy } from './strategies/quizStrategy.config';
import type { WidgetStrategy } from './types';

//  Strategy registry - a map from widget type string to its strategy.
//
//  Adding a new widget type:
//  1. Create a new strategy component in ./strategies/
//  2. Create a .config.ts with the strategy object
//  3. Import and call `registerStrategy()` below
//  4. Update WidgetType union in widget.types.ts

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const strategies = new Map<WidgetType, WidgetStrategy<any, any>>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function registerStrategy(strategy: WidgetStrategy<any, any>): void {
  if (strategies.has(strategy.type as WidgetType)) {
    console.warn(`[WidgetEngine] Strategy "${strategy.type}" is already registered, overwriting.`);
  }
  strategies.set(strategy.type as WidgetType, strategy);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getStrategy(type: WidgetType): WidgetStrategy<any, any> | undefined {
  return strategies.get(type);
}

export function getRegisteredTypes(): WidgetType[] {
  return Array.from(strategies.keys());
}

registerStrategy(quizStrategy);
registerStrategy(codeOrderingStrategy);
