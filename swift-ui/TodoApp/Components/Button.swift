import SwiftUI
import NimbusSwiftUI

private struct ButtonStyle: ViewModifier {
  var primary: Bool

  func body(content: Content) -> some View {
    if (primary) {
      content.buttonStyle(.borderedProminent)
    } else {
      content.buttonStyle(.bordered)
    }
  }
}

struct AppButton: View, Decodable {
  var text: String
  var primary: Bool?
    
  @Event
  var onPress: () -> Void
  
  var body: some View {
    Button(text) {
      onPress()
    }.modifier(ButtonStyle(primary: primary == true))
  }
}
