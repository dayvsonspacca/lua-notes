// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use lua_sql_builder::mysql::{
    create::Create,
    insert::Insert,
    select::Select,
    where_::{Combiner, Where},
};
use serde::Serialize;
use sqlite::{open, State};

fn main() {
    create_database_structure();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_notes, get_note, add_note])
        .run(tauri::generate_context!())
        .expect("error while running lua notes application");
}

fn create_database_structure() {
    let connection = open("memory.sqlite").unwrap();
    let mut create_notes = Create::new("notes");

    create_notes.columns(
        "id INTEGER PRIMARY KEY AUTOINCREMENT,
         title VARCHAR(255) NOT NULL,
         content TEXT,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
         updated_at DATETIME DEFAULT CURRENT_TIMESTAMP",
    );

    connection.execute(create_notes.build()).unwrap();
}

#[tauri::command]
fn get_notes() -> String {
    let mut notes: Vec<Note> = vec![];

    let connection = open("memory.sqlite").unwrap();
    let query = Select::new().from("notes").build();

    let mut statement = connection.prepare(query).unwrap();

    while let Ok(State::Row) = statement.next() {
        notes.push(Note {
            id: statement.read::<i64, _>("id").unwrap(),
            title: statement.read::<String, _>("title").unwrap(),
            content: statement.read::<String, _>("content").unwrap(),
            created_at: statement.read::<String, _>("created_at").unwrap(),
            updated_at: statement.read::<String, _>("updated_at").unwrap(),
        });
    }

    match serde_json::to_string(&notes) {
        Ok(json_str) => json_str,
        Err(e) => {
            println!("Error in to_string: {}", e);
            String::new()
        }
    }
}

#[tauri::command]
fn get_note(id: &str) -> String {
    let connection = open("memory.sqlite").unwrap();
    let mut where_ = Where::new(Combiner::And);
    where_.equal_to("id", id);

    let query = Select::new().from("notes").where_(where_).build();

    let mut statement = connection.prepare(query).unwrap();

    while let Ok(State::Row) = statement.next() {
        let note = Note {
            id: statement.read::<i64, _>("id").unwrap(),
            title: statement.read::<String, _>("title").unwrap(),
            content: statement.read::<String, _>("content").unwrap(),
            created_at: statement.read::<String, _>("created_at").unwrap(),
            updated_at: statement.read::<String, _>("updated_at").unwrap(),
        };

        match serde_json::to_string(&note) {
            Ok(json_str) => return json_str,
            Err(e) => {
                println!("Error in to_string: {}", e);
                return String::new();
            }
        }
    }

    String::new()
}

#[tauri::command]
fn add_note(name: &str) {
    let connection = open("memory.sqlite").unwrap();
    let mut insert = Insert::new("notes");
    insert.values(vec![["title", name], ["content", ""]]);

    connection.execute(insert.build()).unwrap();
}

#[derive(Serialize)]
struct Note {
    id: i64,
    title: String,
    content: String,
    created_at: String,
    updated_at: String,
}
