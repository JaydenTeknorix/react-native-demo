import { NativeModule, requireNativeModule } from 'expo';

declare class QuickActionsModule extends NativeModule<{}> {
  setShortcutItems(title: string, subtitle: string): void;
}

export default requireNativeModule<QuickActionsModule>('QuickActions');
