import SwiftUI
import NimbusSwiftUI

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
