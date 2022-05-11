import { Product } from "./Shop";

function CardItem(props: { item: Product }) {
    const item = props.item;

    return (
        <div className='card' style={{ width: "18rem" }}>
            <div card-image><img className="card-img-top" src={item.image} alt="Card image cap" /></div>
            <div className="card-body">
                <h5 className="card-title">{item.title.toString()}</h5>
                <h6 className="card-subtitle mb-2 text-muted item-price">
                    {item.price.toLocaleString(
                        'pl-PL', {
                        style: 'currency',
                        currency: 'PLN',
                    })}
                </h6>
                <a className="card-text">{item.description.toString()}</a>
            </div>
        </div>
    )
}

export default CardItem