import Button from '../buttons/Button'

const Model = ({setOpen}:{setOpen?: any}) => {
    return (
        <div>
            <div>hello</div>
            <Button onClick={() => setOpen(false)}>close</Button>
        </div>
    )
}

export default Model