// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use lua_sql_builder::mysql::create::Create;
use sqlite::{open, Connection};

fn main() {
    let connection = open("memory.sqlite").unwrap();
    create_database_structure(connection);

    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running lua notes application");
}

fn create_database_structure(connection: Connection) {
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
