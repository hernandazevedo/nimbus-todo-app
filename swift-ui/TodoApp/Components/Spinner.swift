import SwiftUI

struct Spinner: View {
  var body: some View {
    Button(text ?? "") {
      onPress()
    }
    .disabled(!(enabled ?? true))
    .frame(width: width, height: height)
    .background(Color(backgroundColor))
    .cornerRadius(radius)
    .font(.system(size: fontSize ?? 16, weight: .regular))
  }
}
