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
function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }
var btn = document.querySelectorAll('.book_now_btn')
var body = document.querySelector('body')
btn.forEach(function(item){
    var id = item.id == 'vip' ? 1 : 0
    item.addEventListener('click',function(){
        var child = document.getElementById('child').value
        var adult = document.getElementById('adult').value
        var numberOfRoom = document.getElementById('number').value
        var startDate = new Date(document.getElementById('startDate').value)
        var endDate = new Date(document.getElementById('endDate').value)
        var numberOfDate = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
        // console.log(numberOfDate)
        var data = getInfo(id).then(function(res){
            var total = (parseInt(adult) * res.adult + parseInt(child) * res.child + parseInt(numberOfDate) * res.night) * parseInt(numberOfRoom)
            var el = document.createElement('div')
            var popup = `
                <div class='popup-container'>
                    <div class='popup-overlay'></div>
                    <div class='popup-wrapper'>
                        <table>
                            <tr>
                                <td>Loại phòng: </td>
                                <td>${ item.id.charAt(0).toUpperCase() + item.id.slice(1) }</td>
                            </tr>
                            <tr>
                                <td>Người lớn: </td>
                                <td>${ adult } người X ${ res.adult.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) }</td>
                            </tr>
                            <tr>
                                <td>Trẻ nhỏ: </td>
                                <td>${ child } người X ${ res.child.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) }</td>
                            </tr>
                            <tr>
                                <td>Ngày bắt đầu: </td>
                                <td>${ convertDate(startDate) }</td>
                            </tr>
                            <tr>
                                <td>Ngày trả phòng: </td>
                                <td>${ convertDate(endDate) }</td>
                            </tr>
                            <tr>
                                <td>Số ngày: </td>
                                <td>${ numberOfDate } ngày X ${ res.night.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) }</td>
                            </tr>
                            <tr>
                                <td>Số phòng: </td>
                                <td>${ numberOfRoom } phòng</td>
                            </tr>
                            <tr>
                                <td>Tổng giá: </td>
                                <td class='price'>${ total.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) }</td>
                            </tr>
                        </table>
                    </div>
                </div>
            `
            el.innerHTML = popup
            body.appendChild(el)
            var overlay = document.querySelector('.popup-overlay')
            var container = document.querySelector('.popup-container')
            overlay.addEventListener('click',function(){
                container.remove()
            })
        })
    })
})