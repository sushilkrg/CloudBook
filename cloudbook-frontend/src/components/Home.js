import Notes from './Notes';

const Home = () => {
    
    return (
        <div>
            <div className="container my-3">

                <h1>Add a Note</h1>
                <form className='my-3'>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Title</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Description</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

             {/* Called Notes components */}
            <Notes/>
        </div>
    )
}

export default Home