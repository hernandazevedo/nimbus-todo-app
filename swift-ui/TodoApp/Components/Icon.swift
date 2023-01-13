import Foundation
import SwiftUI
import NimbusSwiftUI

enum IconName: String, Decodable {
  case search
  case delete
  case plus
  
  var systemName: String {
    switch self {
    case .search:
      return "magnifyingglass"
    case .delete:
      return "trash"
    case .plus:
      return "plus"
    }
  }
}

struct Icon: View, Decodable {
  var name: IconName
  var color: Color?
  var size: Double?

  var body: some View {
    Image(systemName: name.systemName)
      .font(.system(size: size ?? 20, weight: .light))
      .foregroundColor(color)
  }
}
