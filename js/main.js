var $uploadCrop,
    tempFilename,
    rawImg,
    imageId;


function readFile(input) {
    var file_ext_name = '';
    if (input.files && input.files[0]) {
        file_ext_name = input.files[0].name.substring(input.files[0].name.lastIndexOf('.') + 1, input.files[0].name.length);
        if (file_ext_name == 'jpg' || file_ext_name == 'png' || file_ext_name == 'jpeg') {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#cropImagePop').modal('show');
                rawImg = e.target.result;
            }
            console.log(input.files[0]);
            reader.readAsDataURL(input.files[0]);
        } else {
            alert("Tên file bắt buộc .png, .jpg và .jpeg");
        }
    } else {
        console.log("Sorry - you're browser doesn't support the FileReader API");
    }
}
$uploadCrop = $('#upload-demo').croppie({
    viewport: {
        width: 500,
        height: 250,
    },
    boundary: {
        width: 100 + '%',
        height: 260
    },
    enforceBoundary: false,
    enableExif: true
});
$('.ratio-val').on('change', function() {
    if ($('input[name=ratio]:checked').val() == 0) {
        $('.logo').css({
            'width': '50rem',
            'height': '25rem'
        });
        $('.size').html('<i class="fas fa-flag"></i> Kích thước của ảnh là: 500 x 250.');
        $('.offer').html('<i class="fas fa-flag"></i> Quý khách tạo mẫu hóa đơn vui lòng chọn Template_N**_HCN hoặc Template_N**_HCN_LGC để logo đạt đúng tỷ lệ.');
        $('#upload-demo').croppie('destroy');
        $uploadCrop = $('#upload-demo').croppie({
            viewport: {
                width: 500,
                height: 250
            },
            boundary: {
                width: 510,
                height: 260
            },
            enforceBoundary: false,
            enableExif: true
        });
    } else {
        $('.logo').css({
            'width': '25rem',
            'height': '25rem'
        });
        $('.size').html('<i class="fas fa-flag"></i> Kích thước của ảnh là: 250 x 250.');
        $('.offer').html('<i class="fas fa-flag"></i> Quý khách tạo mẫu hóa đơn vui lòng chọn Template_N**_HV hoặc Template_N**_HV_LGC để logo đạt đúng tỷ lệ.');
        $('#upload-demo').croppie('destroy');
        $uploadCrop = $('#upload-demo').croppie({
            viewport: {
                width: 250,
                height: 250,
            },
            boundary: {
                width: 510,
                height: 260
            },
            enforceBoundary: false,
            enableExif: true
        });
    }
})

$('#cropImagePop').on('shown.bs.modal', function() {
    $uploadCrop.croppie('bind', {
        url: rawImg
    }).then(function() {
        $('.cr-slider').attr({
            'min': 0.0000,
            'max': 1.5000
        });
        console.log('jQuery bind successfully');
    });
});

$('#file-l-logo').on('change', function(e) {
    imageId = $(this).data('id');
    tempFilename = $(this).val();
    $('#cancelCropBtn').data('id', imageId);
    $('#msg-left-logo').text(e.target.files[0].name);
    readFile(this);
});
$('#cropImageBtn').on('click', function(ev) {
    $uploadCrop.croppie('result', {
        type: 'base64',
        format: 'png'
    }).then(function(resp) {
        $('#logo').attr('src', resp);
        $('.download-img').attr('href', resp);
        $('#cropImagePop').modal('hide');
        $("#file-l-logo").val("");
        $(':radio:not(:checked)').attr('disabled', true);
    });
});

$("#opacity-slider").change(function() {
    $(".cr-image").css('opacity', $(this).val());
    $(this).attr('aria-valuenow', $(this).val());
});
$(".close").click(function() {
    $("#myModal").css("display", "none");
    $("#file-l-logo").val('');
    $("#msg-left-logo").text("Không có file nào được chọn");
});