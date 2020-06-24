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
function saveOrder(order){
    return axios.post('http://localhost:3000/order', order)
}
function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }
  function monthFirst(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [ pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/')
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
                        <a class="book_now_btn button_hover mt-3" id='save' href="#">Xác nhận</a>
                    </div>
                </div>
            `
            el.innerHTML = popup
            body.appendChild(el)
            var overlay = document.querySelector('.popup-overlay')
            var container = document.querySelector('.popup-container')
            var wrapper = document.querySelector('.popup-wrapper')
            var save = document.getElementById('save')
            save.addEventListener('click', function(){
                let order = {
                    name: item.id,
                    adult: parseInt(adult),
                    child: parseInt(child),
                    startDate: monthFirst(startDate),
                    endDate: monthFirst(endDate),
                    numberOfDate: parseInt(numberOfDate),
                    numberOfRoom: parseInt(numberOfRoom),
                    totalPrice: parseInt(total)
                }
                saveOrder(order).then(function(res){
                    wrapper.innerHTML = 'Chúc mừng bạn đặt phòng thành công'
                }).catch(function(err){
                    wrapper.innerHTML = err
                })
            })
            overlay.addEventListener('click',function(){
                container.remove()
            })
        })
    })
})