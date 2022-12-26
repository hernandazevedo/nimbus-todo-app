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
  var iconRight: String?
  var value: String?
//  var type: TextInputType

  @StatefulEvent var onChange: (String) -> Void

  var body: some View {
    let binding = Binding(
        get: { value ?? "" },
        set: {
          onChange($0)
        }
    )
    TextField(label, text: binding)
  }
}
