import React, { createContext, useEffect, useState } from "react";
import Database from "tauri-plugin-sql-api";

export const DatabaseContext: React.Context<any> = createContext(null)

const DatabaseProvider = ({children}: {children: React.ReactNode}) => {
    const [databaseConection, setDatabaseConnection] = useState<null | Database>(null)
    const databaseSetup = async () => {
        const db = await Database.load(import.meta.env.VITE_MYSQL_PASSWORD!);
        setDatabaseConnection(db)
    }
    useEffect(() => {
        databaseSetup()
    }, [])
    return (
        <DatabaseContext.Provider value={databaseConection}>
            {children}
        </DatabaseContext.Provider>
    )
}

export default DatabaseProvider