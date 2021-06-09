// todolarin secilmesi
const yeniVezife = document.querySelector('.input-vezife')
const yeniVezifeElaveBtn = document.querySelector('.btn-vezife-elaveet')

// todolarin oldugu siyahini secmek

const vezifeSiyahisi = document.querySelector('.vezife-siyahisi')

// localstoragedekileri sehifede gostermek 
document.addEventListener('DOMContentLoaded', localStoragedenOxu)
// addEventListener
yeniVezifeElaveBtn.addEventListener('click', vezifeElaveEt)
vezifeSiyahisi.addEventListener('click', vezifeTamamlaSil)


// event

function vezifeTamamlaSil(e) {
    const kliklenenElement = e.target;
   
    //contains 
    if(kliklenenElement.classList.contains('vezife-btn-tamamlandi')) {
        // eger 
        kliklenenElement.parentElement.classList.toggle('vezife-tamamlandi')
    }

    if(kliklenenElement.classList.contains('vezife-btn-sil')) {
        kliklenenElement.parentElement.classList.toggle('reddol')
        // kliklenen zibil qabinin anasini tapmaliyam sonra anasinin birinci usagina yeni li ye catmaliyam
        // ana div elementdi, onun usagi li elementi ise 0-ci elementdi duzdu?
        // asagidaki kodu yazib o li ni tapib 0-ci indexde oldugunu bilib
        // sonra da onu secib silek Okay guys?
        const silinecekVezife = kliklenenElement.parentElement.children[0].innerText
        localStoragedenSil(silinecekVezife)

        kliklenenElement.parentElement.addEventListener('transitionend', function (){
            kliklenenElement.parentElement.remove()
        })
    }

    
    

}
function vezifeElaveEt(e) {
    e.preventDefault()

    // div yaradacam 

    // <div class="vezife-item vezife-tamamlandi">
    //         <li class="vezife-tanitim">Idmana get</li>
    //         <button class="vezife-btn vezife-btn-tamamlandi" ><i class="fa fa-check" aria-hidden="true"></i></button>
    //         <button class="vezife-btn vezife-btn-sil"><i class="fa fa-trash" aria-hidden="true"></i></button>
    //     </div>
    if(yeniVezife.value.length >0) {
        vezifeItemYarat(yeniVezife.value)
        localStorageSaveEle(yeniVezife.value)

    yeniVezife.value = '';
    } else {
        alert ("Bir shey yaz ora !!!")
    }

    
  

}

function localStorageArrayaCevir() {
    let vezifeler;

    if(localStorage.getItem('vezifeler') ===null) {
        vezifeler = [];
    } else {
        vezifeler = JSON.parse(localStorage.getItem('vezifeler'))
    }

    return vezifeler;
}

function localStorageSaveEle(yeniVezife) {
    let vezifeler = localStorageArrayaCevir()

    vezifeler.push(yeniVezife)
    localStorage.setItem('vezifeler', JSON.stringify(vezifeler))

}


function localStoragedenOxu() {
    let vezifeler = localStorageArrayaCevir()

    vezifeler.forEach(function (vezife){
        vezifeItemYarat(vezife)
    })
}



function vezifeItemYarat(vezife) {
    const vezifeDiv = document.createElement('div');
    vezifeDiv.classList.add('vezife-item')
    // li yaradiriq

    const vezifeLi = document.createElement('li')
    vezifeLi.classList.add('vezife-tanitim')
    vezifeLi.innerText = vezife
    // appendChild(vezifeLi)
    vezifeDiv.appendChild(vezifeLi)

    // tamamlandi buttonu js DOM ile yaradacagiq
    //<button class="vezife-btn vezife-btn-tamamlandi" ><i class="fa fa-check" aria-hidden="true"></i></button>
    const vezifeTamamlandiBtn = document.createElement('button')
    vezifeTamamlandiBtn.classList.add('vezife-btn')
    vezifeTamamlandiBtn.classList.add('vezife-btn-tamamlandi')

    // innerHTML vs Innertext
    vezifeTamamlandiBtn.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>'
    vezifeDiv.appendChild(vezifeTamamlandiBtn)

    // silindi button js DOm ile yarat
    //<button class="vezife-btn vezife-btn-sil"><i class="fa fa-trash" aria-hidden="true"></i></button>
    const vezifeSilBtn = document.createElement('button')
    vezifeSilBtn.classList.add('vezife-btn')
    vezifeSilBtn.classList.add('vezife-btn-sil')
    vezifeSilBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'

    vezifeDiv.appendChild(vezifeSilBtn)

    vezifeSiyahisi.appendChild(vezifeDiv)
}


function localStoragedenSil(vezife) {
    let vezifeler = localStorageArrayaCevir()
    // splice ile silmek

    const silinecekElementIndex = vezifeler.indexOf(vezife)
    // console.log(silinecekElementIndex)
    vezifeler.splice(silinecekElementIndex,1)

    localStorage.setItem('vezifeler', JSON.stringify(vezifeler))

}

