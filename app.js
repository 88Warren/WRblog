
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
});

app.get('/', (req, res) => {
    res.render({title: "Glyn's Gardening Service"})
})