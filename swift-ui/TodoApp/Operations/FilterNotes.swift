import NimbusSwiftUI

struct Note: Decodable {
  var id: Int
  var title: String
  var description: String
  var date: Int
  var isDone: Bool

  func toMap() -> [String: Any] {
    [
      "id": id,
      "title": title,
      "description": description,
      "date": date,
      "isDone": isDone
    ]
  }
}

struct NoteSection: Decodable {
  var date: Int
  var items: [Note]

  func toMap() -> [String: Any] {
    [
      "date": date,
      "items": items.map { $0.toMap() }
    ]
  }
}

struct SaveNote: OperationDecodable {
  static var properties = ["notes", "noteToSave"]

  var notes: [NoteSection]
  var noteToSave: Note

  func execute() -> [Any] {
    let savedNotes: [NoteSection] = []
    notes.forEach { section in
      let savedSection = NoteSection()
      section.items.forEach { item in
        if (item.id == noteToSave.id)
      }
    }
    
  }
}
