import SwiftUI

import NimbusSwiftUI
import NimbusLayoutSwiftUI

let statusBarColor = Color(red: 95/255, green: 114/255, blue: 192/255)

struct ContentView: View {  
  var body: some View {
    VStack() {
      Nimbus(baseUrl: "http://127.0.0.1:3000") {
        NimbusNavigator(url: "/")
      }
      .ui([layout, todoLibrary])
    }
    .padding(EdgeInsets(top: 1, leading: 0, bottom: 0, trailing: 0))
    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading).background(statusBarColor)
  }
}

let todoLibrary = NimbusSwiftUILibrary("todoapp")
  .addComponent("spinner") { _ in
    AnyView(ProgressView())
  }
  .addComponent("button", CustomButton.self)
  .addComponent("textInput", TextInput.self)
  .addComponent("checkbox", CheckBox.self)
  .addComponent("icon", Icon.self)
  .addComponent("selectionGroup", SelectionGroup.self)
  .addComponent("toast", Toast.self)
  .addOperation("formatDate", FormatDate.self)
  .addOperation("filterNotes", FilterNotes.self)
  .addAction("showNotification", ShowNotification.self)
