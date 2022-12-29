import SwiftUI
import NimbusSwiftUI

let unselectedColor = Color(red: 95/255, green: 114/255, blue: 192/255)
let selectedColor = Color(red: 76/255, green: 91/255, blue: 145/255)

struct SelectionGroup: View, Decodable {
  var options: [String]
  var value: String
  @StatefulEvent var onChange: (String) -> Void
  
  var body: some View {
    HStack(spacing: 1) {
      ForEach(options, id: \.self) { option in
        VStack {
          Text(option)
            .font(.system(size: 13))
            .foregroundColor(.white)
        }
        .onTapGesture { onChange(option) }
        .padding(EdgeInsets(top: 8, leading: 10, bottom: 8, trailing: 10))
        .background(value == option ? selectedColor : unselectedColor)
      }
    }
    .background(selectedColor)
    .cornerRadius(6)
    .overlay(
      RoundedRectangle(cornerRadius: 6).stroke(selectedColor, lineWidth: 1)
    )
  }
}
