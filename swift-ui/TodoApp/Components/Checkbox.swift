import SwiftUI
import NimbusSwiftUI

//fun CheckBox(
//    checked: Boolean,
//    label: String,
//    onChange: (value: Boolean) -> Unit,
//    @Ignore modifier: Modifier = Modifier
//)

struct CheckBox: View, Decodable {
  var checked: Bool
  var label: String
  @StatefulEvent var onChange: (Bool) -> Void

  var body: some View {
    HStack {
      Image(systemName: checked ? "checkmark.square.fill" : "square")
        .foregroundColor(checked ? .blue : .secondary)
      Text(label)
    }
    .onTapGesture {
      onChange(!checked)
    }
  }
}
