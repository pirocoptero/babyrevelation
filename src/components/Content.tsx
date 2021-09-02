import logo from '../assets/img/logo.svg';
import cegonha from '../assets/img/cegonha.svg';
import stars from '../assets/img/stars.svg';

export function Content() {
    return (
        <main>
            <div className="stars"></div>
            <div className="logo">
                <img src={logo} alt="Chá Revelação" />
            </div>

            <div className="cegonha">
                <div className="cegonhaimg">
                    <img src={cegonha} alt="Cegonha" />
                </div>
                <div className="datetime">
                    <span>05/09/2021</span>
                    <span>14H00</span>
                    <a href="https://goo.gl/maps/joadSgMC9rFUL1s99">Rua Francisco Fajardo - 111</a>
                    <div className="obs">
                        <p>* Livre para levar lembrancinhas</p>
                        <p>* Levar bebida de sua escolha</p>
                        <p>* Não levar bebida alcoólica</p>
                    </div>
                </div>

            </div>

        </main>
    )
}