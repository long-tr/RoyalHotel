 <section class="facilities_area section_gap">
            <div class="overlay bg-parallax" data-stellar-ratio="0.8" data-stellar-vertical-offset="0" data-background="">  
            </div>
            <div class="container">
                <div class="section_title text-center">
                    <h2 class="title_w">Dịch vụ Phong Tâm</h2>
                    <p>Dịch vụ khách sạn của chúng tôi sẽ làm khách hài lòng.</p>
                </div>
                <div class="row mb_30">
 <?php
            $o = new PDO("mysql:host=localhost; dbname=qlks", "root", "");
            $o->query("set names 'utf8' ");
            $sql="select * from dichvu  ";
 
            $data = $o->query($sql);
            $rows = $data->fetchAll();
            foreach ($rows as $r) {
                ?>
                <div class="col-lg-4 col-md-6">
                        <div class="facilities_item">
                            <h4 class="sec_h4"><i class="dichvu"></i><center><?php echo $r['tendv'] ;?></center></h4>
                            <p><?php echo $r['tieude'] ;?></p>
                        </div>
                    </div>
                <?php
            }
?>
                </div>
            </div>
        </section>