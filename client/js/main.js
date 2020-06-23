function getInfo(id) {
    if(id == 1){
        return axios.get('http://localhost:3000/room/1').then(function(res){
            return res.data
        })
    }
    else{
        return axios.get('http://localhost:3000/room/2').then(function(res){
            return res.data
        })
    }
}

let btn = document.querySelectorAll('.book_now_btn')
btn.forEach(function(item){
    let id = item.id == 'vip' ? 1 : 0
    item.addEventListener('click',function(){
        let child = document.getElementById('child').value
        let adult = document.getElementById('adult').value
        let numberOfRoom = document.getElementById('number').value
        let startDate = new Date(document.getElementById('startDate').value)
        let endDate = new Date(document.getElementById('endDate').value)
        let numberOfDate = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
        // console.log(numberOfDate)
        let data = getInfo(id).then(function(res){
            let total = (parseInt(adult) * res.adult + parseInt(child) * res.child + parseInt(numberOfDate) * res.night) * parseInt(numberOfRoom)
            console.log(total)
        })
    })
})