import React, {Fragment, useState} from "react";
import Dialog from '@material-ui/core/Dialog'
import Grow from '@material-ui/core/Grow'
import Button from '@material-ui/core/Button'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Chip from '@material-ui/core/Chip'
import imagen1 from './static/imagen1.svg'
import imagen2 from './static/imagen2.svg'
import imagen3 from './static/imagen3.svg'
import imagen4 from './static/imagen4.svg'
import Swiper from 'react-id-swiper';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow timeout={2000} ref={ref} {...props} />;
  });


const Instrucciones = () => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const params = {
        centeredSlides: true,
        speed: 600,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
    }

    return (
        <Fragment>
            <Chip
                className="instrucciones"
                icon={<MenuBookIcon/>}
                label={<b>Instrucciones</b>}
                clickable
                color="default"
                onClick={handleClickOpen}
            />
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <div>
                    <Button fullWidth color="inherit" onClick={handleClose}>
                        Volver
                    </Button>
                </div>
                <div className="antesSwiper">
                    <Swiper {...params} style={{height: "100%"}}>
                        <div style={{background: "#8ae3a8"}}>
                            <div className="swiper-slide-container">
                                <div className="swiperItem">
                                    <h2>1- Selección de muestras</h2>
                                    <div className="swiperImg"><img className="imagen1" src={imagen1} alt="imagen"/></div>
                                    <p>Seleccionar 20 muestras que abarquen niveles bajos, normales y elevados del analito.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{background: "#b09684"}}>
                            <div className="swiper-slide-container">
                                <div className="swiperItem">
                                    <h2>2- Análisis de muestras en ambos instrumentos</h2>
                                    <div className="swiperImg"><img src={imagen2} alt="imagen"/></div>
                                    <p>El análisis debe realizarse el mismo día como si fueran muestras normales.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{background: "#7ab0de"}}>
                            <div className="swiper-slide-container">
                                <div className="swiperItem">
                                    <h2>3- Ingreso de datos y resultados</h2>
                                    <div className="swiperImg"><img src={imagen3} alt="imagen"/></div>
                                    <p>Completa los datos necesarios para realizar el estudio e informe en la aplicación.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{background: "white"}}>
                            <div className="swiper-slide-container">
                                <div className="swiperItem">
                                    <h2 style={{color: "black"}}>4- Genera tu informe</h2>
                                    <div className="swiperImg"><img className="informe" src={imagen4} alt="imagen"/></div>
                                    <p style={{color: "black"}}>Inmediatamente luego de ingresar todos los resultados y datos podrás generar el informe describiendo el estudio.</p>
                                </div>
                            </div>
                        </div>
                    </Swiper>
                </div>
               
            </Dialog>
        </Fragment>
    )
};

export default Instrucciones;