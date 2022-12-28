import SwiftUI
import NimbusSwiftUI

//fun TextInput(
//    label: String,
//    iconRight: String? = null,
//    value: String? = null,
//    type: TextInputType? = null,
//    onChange: (value: String) -> Unit,
//    @Ignore modifier: Modifier = Modifier
//)

struct TextInput: View, Decodable {
  var label: String
  var value: String?
  var color: Color?
  @StatefulEvent var onChange: (String) -> Void

  var body: some View {
    let binding = Binding(
        get: { value ?? "" },
        set: {
          onChange($0)
        }
    )
    ZStack(alignment: .leading) {
      if (value?.isEmpty != false) { Text(label).foregroundColor(color) }
      TextField("", text: binding)
        .foregroundColor(color)
        .accentColor(color)
    }.padding(16)
  }
}
