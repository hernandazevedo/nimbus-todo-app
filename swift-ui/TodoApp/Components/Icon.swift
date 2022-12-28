import Foundation
import SwiftUI
import NimbusSwiftUI

//enum IconName: Decodable {
//  case search
//  case delete
//}
//
//func systemName(_ name: IconName) -> String {
//  switch name {
//  case .search: return "magnifyingglass"
//  case .delete: return "trash"
//  }
//}

func systemName(_ name: String) -> String {
  switch name {
  case "search": return "magnifyingglass"
  case "delete": return "trash"
  default: return ""
  }
}

struct Icon: View, Decodable {
//  var name: IconName
  var name: String
  var color: Color?
  var size: Double?

  var body: some View {
    Image(systemName: systemName(name))
      .font(.system(size: size ?? 20, weight: .light))
      .foregroundColor(color)
  }
}
