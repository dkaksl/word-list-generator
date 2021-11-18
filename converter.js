import {existsSync, readFileSync, writeFileSync} from 'fs'

const dictionaryFileName = "raw.txt"

const main = () => {
    if (!existsSync(dictionaryFileName)) {
        throw new Error(`missing required dictionary file: ${dictionaryFileName}`)
    }
    const rawList = readFileSync(dictionaryFileName).toString()

    const rows = rawList.split("\n")
    const words = rows.filter(row => {
        const columns = row.split("\t")
        return /NN/.test(columns[1])
    }).map(row => {
        const columns = row.split("\t")
        return columns[0]
    })

    writeFileSync("processed.txt", words.join("\n"))

    for (var i = 0; i < 10; i++) {
        const randomWords = []
        for (var ii = 0; ii < 20; ii++) {
            randomWords.push(words[Math.floor(Math.random() * 2000)])
        }
        writeFileSync(`random-words-${i}.txt`,randomWords.join("\n"))
    }
}
main ()