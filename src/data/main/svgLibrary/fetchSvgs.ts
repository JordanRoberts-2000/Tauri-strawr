import Database from "tauri-plugin-sql-api"

const delay = async () => new Promise((resolve) => setTimeout(resolve, 4000))

const fetchSvgs = async () => {
    const db = await Database.load(import.meta.env.VITE_MYSQL_PASSWORD)
    console.log('TRIGGERED')
    await delay()
    console.log('GOT DATA')
    if(!db)return
    const data = await db.select('select * from svglibrary')
    db.close()
    return data
}

export default fetchSvgs