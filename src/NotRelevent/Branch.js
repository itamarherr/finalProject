const Branch = ({data,setData,setItemCategory,handleSave,navigate,id,onDelete})=> { 
    return(
           <>

        <div className="container">
            {/* <div className="form-grupe">
                <label className="form-label"> branch Name</label>
                <input
                type="string"
                value={data.brandName}
                onChange={(e)=> setData({...data, brandName: e.target.value})}
                className="form-control"
                placeholder="enter datas brandName"
                />
            </div> */}
            <div className="form-grupe">
                <label className="form-label">branch Address</label>
                <input
                type="text"
                value={data.branchAddress}
                onChange={(e)=> setData({...data, branchAddress: e.target.value})}
                className="form-control"
                placeholder="enter your address"
                />
            </div>
            {/* <div className="form-grupe">
                <label className="form-label">branchFacebookPage</label>
                <input
                type="text"
                value={data.branchFacebookPage}
                onChange={(e)=> setData({...data,branchFacebookPage: e.target.value})}
                className="form-control"
                placeholder="enter datas branchFacebookPage"
                />
            </div> */}
         
            <button onClick={onDelete}>  delete branch</button>
      
        </div>
        </>

    )

}
export default Branch;

