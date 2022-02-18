import React, { useState, useEffect } from 'react'
// import VSpacerComponent from '../../components/v_spacer/v_spacer.component'


import './quote_of_the_day.component.scss'

const Quote = require('inspirational-quotes')




const QuoteOfTheDayComponent = () => {
    const [quote, setQuote] = useState()

    // https://type.fit/api/quotes
    const getApiQuote = async ()=> {
        try {
            let request = await fetch('https://type.fit/api/quotes')
            let json = await request.json()
            // console.log('json ', json)
            // console.log('json length ', json.length)

            const random_index = parseInt(Math.random() * (json.length - 4))

            const random_quote = json[random_index]

            setQuote(random_quote.text)
        } catch (e) {
            console.log('error ', e)
            setQuote(Quote.getRandomQuote())
        }
    }

    // console.log(Quote.getQuote({ author: false }))
    // console.log(Quote.getRandomQuote())


    useEffect(()=> {
        getApiQuote()
    }, [])


    if( !quote ) {
        return <div />
    }
    return (
        <div className='quote_container'>
            
            {/* <h1> Quote </h1>
            <VSpacerComponent space={2} /> */}

            <p>
                <q>
                    {quote}
                </q>
            </p>

        </div>
    )
}


export default QuoteOfTheDayComponent
