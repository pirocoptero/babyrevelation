import React from 'react';

export function Header() {

    const frase = "BABY FERREIRA";
    const letras = frase.split("");

    return (
        <header>

            <h1>ADRIANO + GABRIELE +&nbsp;
                {
                    letras.map((letra, i) => {
                        if ((i & 1)) {
                            return <span key={i} className="blue">{letra}</span>
                        }
                        else {
                            return <span key={i} className="pink">{letra}</span>
                        }
                    })
                }
            </h1>
        
            <p>CONVIDAM VOCÊ PARA O</p>
        </header>
    )
}