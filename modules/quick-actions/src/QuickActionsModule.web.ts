import { registerWebModule, NativeModule } from 'expo';

class QuickActionsModule extends NativeModule<{}> {}

export default registerWebModule(QuickActionsModule, 'QuickActionsModule');
