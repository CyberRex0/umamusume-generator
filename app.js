// Umamusume Generator
// (C)2021 CyberRex

var config = {
    tekisei: {
        siba: 'A',
        dart: 'A',
        sprint: 'A',
        mile: 'A',
        middle: 'A',
        long: 'A',
        nige: 'A',
        senkou: 'A',
        sasi: 'A',
        oikomi: 'A'
    },
    params: {
        speed: 100,
        stamina: 100,
        power: 100,
        konjou: 100,
        kasikosa: 100
    },
    chara_rank: 'A',
    tag: 'ここに称号を入力',
    name: 'ここに名前を入力',
    catchcopy: 'キャッチコピー'
}

var imageAssets = {
    base: canvasImage('assets/image/base2.png'),
    icon: canvasImage('assets/image/icon_default.png'),

    tekisei_SS_PLUS: canvasImage('assets/image/grades/uma_tekisei_SS_PLUS.png'),
    tekisei_SS: canvasImage('assets/image/grades/uma_tekisei_SS.png'),
    tekisei_S_PLUS: canvasImage('assets/image/grades/uma_tekisei_S_PLUS.png'),
    tekisei_S: canvasImage('assets/image/grades/uma_tekisei_S.png'),
    tekisei_A_PLUS: canvasImage('assets/image/grades/uma_tekisei_A_PLUS.png'),
    tekisei_A: canvasImage('assets/image/grades/uma_tekisei_A.png'),
    tekisei_B_PLUS: canvasImage('assets/image/grades/uma_tekisei_B_PLUS.png'),
    tekisei_B: canvasImage('assets/image/grades/uma_tekisei_B.png'),
    tekisei_C_PLUS: canvasImage('assets/image/grades/uma_tekisei_C_PLUS.png'),
    tekisei_C: canvasImage('assets/image/grades/uma_tekisei_C.png'),
    tekisei_D_PLUS: canvasImage('assets/image/grades/uma_tekisei_D_PLUS.png'),
    tekisei_D: canvasImage('assets/image/grades/uma_tekisei_D.png'),
    tekisei_E_PLUS: canvasImage('assets/image/grades/uma_tekisei_E_PLUS.png'),
    tekisei_E: canvasImage('assets/image/grades/uma_tekisei_E.png'),
    tekisei_F_PLUS: canvasImage('assets/image/grades/uma_tekisei_F_PLUS.png'),
    tekisei_F: canvasImage('assets/image/grades/uma_tekisei_F.png'),
    tekisei_G_PLUS: canvasImage('assets/image/grades/uma_tekisei_G_PLUS.png'),
    tekisei_G: canvasImage('assets/image/grades/uma_tekisei_G.png'),

    chara_rank_SS_PLUS: canvasImage('assets/image/chara_grades/chara_rank_SS_PLUS.png'),
    chara_rank_SS: canvasImage('assets/image/chara_grades/chara_rank_SS.png'),
    chara_rank_S_PLUS: canvasImage('assets/image/chara_grades/chara_rank_S_PLUS.png'),
    chara_rank_S: canvasImage('assets/image/chara_grades/chara_rank_S.png'),
    chara_rank_A_PLUS: canvasImage('assets/image/chara_grades/chara_rank_A_PLUS.png'),
    chara_rank_A: canvasImage('assets/image/chara_grades/chara_rank_A.png'),
    chara_rank_B_PLUS: canvasImage('assets/image/chara_grades/chara_rank_B_PLUS.png'),
    chara_rank_B: canvasImage('assets/image/chara_grades/chara_rank_B.png'),
    chara_rank_C_PLUS: canvasImage('assets/image/chara_grades/chara_rank_C_PLUS.png'),
    chara_rank_C: canvasImage('assets/image/chara_grades/chara_rank_C.png'),
    chara_rank_D_PLUS: canvasImage('assets/image/chara_grades/chara_rank_D_PLUS.png'),
    chara_rank_D: canvasImage('assets/image/chara_grades/chara_rank_D.png'),
    chara_rank_E_PLUS: canvasImage('assets/image/chara_grades/chara_rank_E_PLUS.png'),
    chara_rank_E: canvasImage('assets/image/chara_grades/chara_rank_E.png'),
    chara_rank_F_PLUS: canvasImage('assets/image/chara_grades/chara_rank_F_PLUS.png'),
    chara_rank_F: canvasImage('assets/image/chara_grades/chara_rank_F.png'),
    chara_rank_G_PLUS: canvasImage('assets/image/chara_grades/chara_rank_G_PLUS.png'),
    chara_rank_G: canvasImage('assets/image/chara_grades/chara_rank_G.png')
}

var tekiseiSelectors;
var paramInputs;
var filePicker;
var canvas;

var oldCatchcopy, oldName, oldTag;

$(function () {

    // init

    canvas = document.getElementById('surface');
    filePicker = document.getElementById('icon');

    // クラス一括検索でconfigの取り込みを行う
    tekiseiSelectors = document.querySelectorAll('.tekiseiinput');
    paramInputs = document.querySelectorAll('.paraminput');

    for (dom of tekiseiSelectors) {
        var id = dom.id.replace('tekisei_', '');
        config.tekisei[id] = dom.value;
        // イベントハンドラ設定
        dom.onchange = function () {
            var id = this.id.replace('tekisei_', '');
            config.tekisei[id] = this.value;
            renderImage();
        }
    }

    for (dom of paramInputs) {
        var id = dom.id.replace('param_', '');
        config.params[id] = Math.floor(Number(dom.value.replace('e', '')));
        // イベントハンドラ設定
        dom.onchange = function () {
            var id = this.id.replace('param_', '');
            config.params[id] = Math.floor(Number(this.value.replace('e', '')));
            if (config.params[id] < 0) {
                config.params[id] = 0;
                this.value = '0';
            }
            if (config.params[id] > 1200) {
                config.params[id] = 1200;
                this.value = '1200';
            }
            renderImage();
        }
    }

    // キャラクターランク
    var chara_rank_select = document.getElementById('chara_rank');
    chara_rank_select.onchange = function () {
        config.chara_rank = this.value;
        renderImage();
    }

    // ファイル選択ハンドラ設定
    filePicker.onchange = function () {
        var f = this.files[0];
        var i = new Image();
        var fr = new FileReader();

        fr.onload = function (event) {
            i.onload = function () {
                imageAssets.icon = i;
                renderImage();
            }
            i.src = event.target.result;
        }

        fr.readAsDataURL(f);
    }

    renderImage();

    // テキスト変更監視
    setInterval(() => {
        var ccInput = document.getElementById('catchcopy');
        var nmInput = document.getElementById('name');
        var tgInput = document.getElementById('tag');
        var changeDetected = false;
        if (ccInput.value != config.catchcopy) {
            config.catchcopy = ccInput.value;
            changeDetected = true;
        }
        if (nmInput.value != config.name) {
            config.name = nmInput.value;
            changeDetected = true;
        }
        if (tgInput.value != config.tag) {
            config.tag = tgInput.value;
            changeDetected = true;
        }
        if (changeDetected) {
            renderImage();
        }
    }, 1000);

});

function renderImage() {
    var ctx = canvas.getContext('2d');
    
    if (!imageAssets.base.complete) {
        setTimeout(() => {
            ctx.fillRect(140, 60, 210, 210);
            ctx.drawImage(imageAssets.icon, 140, 55, 210, 210);
            ctx.drawImage(imageAssets.base, 0, 0);
            renderImage2();
        }, 1000);
    }else{
        ctx.fillRect(140, 60, 210, 210);
        ctx.drawImage(imageAssets.icon, 140, 55, 210, 210);
        ctx.drawImage(imageAssets.base, 0, 0);
        renderImage2();
    }

    
}

function renderImage2() {
    var ctx = canvas.getContext('2d');
    ctx.font = '48px Umago';
    ctx.fillStyle = '#794016';
    ctx.textAlign = 'center';

    // 名前描画
    ctx.font = '28px Umago';
    ctx.fillText('['+config.catchcopy+']', 695, 110);
    ctx.fillText(config.name, 695, 145);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(config.tag, 698, 248);


    ctx.font = '40px Umago';
    var grad = ctx.createLinearGradient(0, 356, 0, 446);
    grad.addColorStop(0.2, 'rgb(255,120,10)');
    grad.addColorStop(0.35, 'rgb(180,85,7)');
    grad.addColorStop(0.50, 'rgb(154,72,5)');
    ctx.fillStyle = grad;

    // パラメータ描画
    drawParam(ctx, config.params.speed, 160, 406);
    drawParam(ctx, config.params.stamina, 360, 406);
    drawParam(ctx, config.params.power, 560, 406);
    drawParam(ctx, config.params.konjo, 760, 406);
    drawParam(ctx, config.params.kasikosa, 960, 406);

    // 適性描画
    drawTekisei(ctx, config.tekisei.siba, 360, 456);
    drawTekisei(ctx, config.tekisei.dart, 560, 456);

    drawTekisei(ctx, config.tekisei.sprint, 360, 516);
    drawTekisei(ctx, config.tekisei.mile, 560, 516);
    drawTekisei(ctx, config.tekisei.middle, 760, 516);
    drawTekisei(ctx, config.tekisei.long, 960, 516);

    drawTekisei(ctx, config.tekisei.nige, 360, 576);
    drawTekisei(ctx, config.tekisei.senkou, 560, 576);
    drawTekisei(ctx, config.tekisei.sasi, 760, 576);
    drawTekisei(ctx, config.tekisei.oikomi, 960, 576);

    // キャラクターランク描画
    drawCharacterRank(ctx, config.chara_rank, 370, 30);
}

function canvasImage(path) {
    var i = new Image();
    i.src = path;
    return i;
}

function download() {
    var dlelm = document.getElementById('dwnld');
    var dt = new Date().toLocaleString('ja-jp').replaceAll('/','-').replaceAll(':', '-').replaceAll(' ', '_');
    dlelm.href = canvas.toDataURL('image/png');
    dlelm.download = 'UmamusumeGenerator_' + dt + '.png';
    dlelm.click();
}

function drawParam(ctx, v, x, y) {
    var i = imageAssets['tekisei_'+getGradeFromValue(v)];
    ctx.fillText(v, x, y);
    ctx.drawImage(i, x - 100, y - 45, 60, 56);
}

function drawTekisei(ctx, v, x, y) {
    var i = imageAssets['tekisei_'+v];
    ctx.drawImage(i, x, y, 44, 40);
}

function drawCharacterRank(ctx, v, x, y) {
    var i = imageAssets['chara_rank_'+v];
    ctx.drawImage(i, x, y, 96, 96);
}

function getGradeFromValue(stat) {
    if (stat < 0) return 'G'; 
    if (stat >= 0 && stat <= 49) {
        return 'G';
    }else if (stat >= 50 && stat <= 99) {
        return 'G_PLUS';
    }else if (stat >= 100 && stat <= 149) {
        return 'F';
    }else if (stat >= 150 && stat <= 199) {
        return 'F_PLUS';
    }else if (stat >=200 && stat <= 249) {
        return 'E';
    }else if ( stat >= 250 && stat <= 299) {
        return 'E_PLUS';
    }else if ( stat >= 300 && stat <= 349) {
        return 'D';
    }else if ( stat >= 350 && stat <= 399) {
        return 'D_PLUS';
    }else if ( stat >= 400 && stat <= 499) {
        return 'C';
    }else if ( stat >= 500 && stat <= 599) {
        return 'C_PLUS';
    }else if ( stat >= 600 && stat <= 699) {
        return 'B';
    }else if ( stat >= 700 && stat <= 799) {
        return 'B_PLUS';
    }else if ( stat >= 800 && stat <= 899) {
        return 'A';
    }else if ( stat >= 900 && stat <= 999) {
        return 'A_PLUS';
    }else if ( stat >= 1000 && stat <= 1049) {
        return 'S';
    }else if ( stat >= 1050 && stat <= 1099) {
        return 'S_PLUS';
    }else if ( stat >= 1100 && stat <= 1149) {
        return 'SS';
    }else if ( stat >= 1150) {
        return 'SS_PLUS';
    }
}