var $uploadCrop,
    tempFilename,
    rawImg,
    imageId;


function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#cropImagePop').modal('show');
            rawImg = e.target.result;
        }
        console.log(input.files[0]);
        reader.readAsDataURL(input.files[0]);
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
        $('.offer').html('<i class="fas fa-flag"></i> Quý khách tạo mẫu hóa đơn vui lòng chọn Template_Mxx_HCN để logo đạt đúng tỷ lệ.');
        $('#upload-demo').croppie('destroy');
        $uploadCrop = $('#upload-demo').croppie({
            viewport: {
                width: 50 + 'rem',
                height: 25 + 'rem',
            },
            boundary: {
                width: 100 + '%',
                height: 260
            },
            enforceBoundary: false,
            enableExif: true
        });
    } else if ($('input[name=ratio]:checked').val() == 1) {
        $('.logo').css({
            'width': '25rem',
            'height': '25rem'
        });
        $('.size').html('<i class="fas fa-flag"></i> Kích thước của ảnh là: 250 x 250.');
        $('.offer').html('<i class="fas fa-flag"></i> Quý khách tạo mẫu hóa đơn vui lòng chọn Template_Mxx_HV để logo đạt đúng tỷ lệ.');
        $('#upload-demo').croppie('destroy');
        $uploadCrop = $('#upload-demo').croppie({
            viewport: {
                width: 25 + 'rem',
                height: 25 + 'rem',
            },
            boundary: {
                width: 100 + '%',
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