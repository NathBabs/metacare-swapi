import app from './app.js'
const PORT = 6000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});