import NimbusSwiftUI

struct ShowNotification: ActionDecodable {
  var type: String
  var message: String

  func execute() {
    print("\(type):\(message)")
  }
}
