import Foundation
import SwiftUI
import NimbusSwiftUI

private let durationSeconds = 6.0

struct Toast: View, Decodable {
  var message: String
  @Event var onHide: () -> Void
  
  var body: some View {
    VStack {
      Text(message).foregroundColor(Color.white).font(.system(size: 12)).fontWeight(.bold)
    }
    .onChange(of: message) { newValue in
      if (!newValue.isEmpty) {
        DispatchQueue.main.asyncAfter(deadline: .now() + durationSeconds) {
          onHide()
        }
      }
    }
    .padding(EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16))
    .background(Color(red: 1, green: 0, blue: 0, opacity: 0.5))
    .cornerRadius(20)
    .shadow(radius: 4, x: 1, y: 1)
    .opacity(message.isEmpty ? 0 : 1)
  }
}
