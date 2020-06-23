<section class="accomodation_area section_gap">
            <div class="container">
                <div class="section_title text-center">
                    <h2 class="title_color">Loại phòng của khách sạn</h2>
                    <p>Khách sạn của chúng tôi có nhiều loại phòng khác nhau về chất lượng lẫn giá cả nhằm cung cấp nhu cầu của khách hàng</p>
                </div>
                <div class="row mb_30">
<?php
            $o = new PDO("mysql:host=localhost; dbname=qlks", "root", "");
            $o->query("set names 'utf8' ");
            $sql="select * from loaiphong  ";

            $data = $o->query($sql);
            $rows = $data->fetchAll();
            foreach ($rows as $r) 
            {
                ?>
                <div class="col-lg-3 col-sm-6">
                        <div class="accomodation_item text-center">
                            <div class="hotel_img">
                                <img src="image/ChiTiet/Loaiphong/<?php echo $r['hinh'];?>" alt="">
                                <a href="#" class="btn theme_btn button_hover">Xem chi tiết</a>
                            </div>
                            <a href="#"><h4 class="sec_h4"><?php echo $r['tenloai'];?></h4></a>
                            <h5><?php echo $r['gia'];?>K<small>/đêm</small></h5>
                        </div>
                    </div>
                <?php
            }
?>
                </div>
            </div>
        </section>