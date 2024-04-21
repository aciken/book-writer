const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const OpenAI = require("openai");

const pdfCreate = async (req,res) => {
    const {pageLength, description, title, author} = req.body;

    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY , dangerouslyAllowBrowser: true});

    let text;
    async function main1() {

        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are a book writer that is writing a book using a description of what that book is about"},
                {"role": "user", "content": "Write a short book that is" + pageLength + "long using this description:" + description + ".This book should conain" + pageLength*500 + "words. The title of the book is" + title + "and the author is" + author},
            ],
            model: "gpt-3.5-turbo",
        });

        text = completion.choices[0].message.content;
    }

    await main1();

    const pdfCall = async () => {
        try {
            const pdfDoc = await PDFDocument.create();

            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

            for (let i = 0; i < pageLength; i++) {
                // Add a new page to the document
                const page = pdfDoc.addPage();
        
                // Get the width and height of the page
                const { width, height } = page.getSize();
        
                // Draw some text on the page
                if(i == 1){
                    const fontSize = 12;
                    const lineHeight = fontSize * 1.5;
                    const margin = 50;
                    const textWidth = width - 2 * margin;
                    const words = text.replace(/\n/g, ' ').split(' ');
                    let line = '';
                    let y = height - margin;

                    for (const word of words) {
                        const newLine = line + (line ? ' ' : '') + word;
                        const newLineWidth = helveticaFont.widthOfTextAtSize(newLine, fontSize);

                        if (newLineWidth > textWidth && line) {
                            page.drawText(line, {
                                x: margin,
                                y: y,
                                size: fontSize,
                                font: helveticaFont,
                                color: rgb(0, 0, 0),
                            });
                            line = word;
                            y -= lineHeight;
                        } else {
                            line = newLine;
                        }
                    }

                    // Draw the last line
                    if (line) {
                        page.drawText(line, {
                            x: margin,
                            y: y,
                            size: fontSize,
                            font: helveticaFont,
                            color: rgb(0, 0, 0),
                        });
                    }
                }
            }

            const pdfBytes = await pdfDoc.save();

            fs.writeFileSync('out.pdf', pdfBytes);
        } catch (error) {
            console.error(error);
            // Handle the error appropriately here
            // For example, you could send a response with an error message:
            res.status(500).send({ error: 'An error occurred while creating the PDF.' });
        }
    }

    pdfCall();
}

module.exports = pdfCreate;