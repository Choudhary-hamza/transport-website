import styling from "./mediaSection.module.css"
export default function MediaSection(){
    return<div className={styling.main}>
        <div className={styling.container}>
            <div className={styling.subcontainer1}>
                <span className={styling.phone}>
                    <i className="ri-phone-fill"></i>
                    <a href="tel:+966 54 451 9392 " className={styling.phoneNumber}>+966 54 451 9392 </a>
                </span>
                <span className={styling.phone}>
                    <i className="ri-whatsapp-fill"></i>
                    <a href="https://wa.me/+966 54 451 9392 " className={styling.phoneNumber}>+966 54 451 9392 </a>
                </span>
            </div>
        </div>
    </div>
}