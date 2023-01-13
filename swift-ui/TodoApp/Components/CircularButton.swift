import SwiftUI
import NimbusSwiftUI

struct CircularButton: View, Decodable {
  var icon: IconName
  @Event var onPress: () -> Void

  var body: some View {
    Button(action: onPress) {
      Icon(name: icon, color: .white)
    }
    .frame(width: 50, height: 50)
    .background(Color(red: 95/255, green: 114/255, blue: 192/255))
    .cornerRadius(25)
    .shadow(radius: 2)
  }
}
