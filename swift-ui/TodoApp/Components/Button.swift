import SwiftUI
import NimbusSwiftUI

struct CustomButton: View, Decodable {
  var text: String?
  var enabled: Bool?
  var radius: Double?
  var width: CGFloat?
  var height: CGFloat?
  var fontSize: Double?
  var backgroundColor: Color?
  var foregroundColor: Color?
  @Event var onPress: () -> Void

  var body: some View {
    Button(text ?? "") {
      onPress()
    }
    .disabled(!(enabled ?? true))
    .frame(width: width, height: height)
    .background(backgroundColor)
    .cornerRadius(radius ?? 0.0)
    .font(.system(size: fontSize ?? 16, weight: .regular))
    .foregroundColor(foregroundColor)
  }
}

