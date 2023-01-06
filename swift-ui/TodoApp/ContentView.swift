import SwiftUI

import NimbusSwiftUI
import NimbusLayoutSwiftUI

struct ContentView: View {  
  var body: some View {
    Nimbus(baseUrl: "http://127.0.0.1:3000") {
      NimbusNavigator(url: "/")
    }
    .ui([layout, todoLibrary])
  }
}

let todoLibrary = NimbusSwiftUILibrary("todoapp")
  .addComponent("spinner") { _ in
    AnyView(ProgressView())
  }
  .addComponent("button", CustomButton.self)
  .addComponent("textInput", TextInput.self)
  .addComponent("icon", Icon.self)
  .addComponent("selectionGroup", SelectionGroup.self)
  .addComponent("toast", Toast.self)
  .addOperation("formatDate", FormatDate.self)
  .addOperation("filterNotes", FilterNotes.self)
