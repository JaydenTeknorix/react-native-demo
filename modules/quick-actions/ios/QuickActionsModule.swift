import ExpoModulesCore
import UIKit

public class QuickActionsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("QuickActions")

    Function("setShortcutItems") { (title: String, subtitle: String) -> Void in
      DispatchQueue.main.async {
        let item = UIApplicationShortcutItem(
          type: "report_issue",
          localizedTitle: title,
          localizedSubtitle: subtitle,
          icon: UIApplicationShortcutIcon(type: .add),
          userInfo: nil
        )
        UIApplication.shared.shortcutItems = [item]
      }
    }
  }
}
