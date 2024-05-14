// a^m b^p c^p+m m>=1, p>=1

const cadena = document.getElementById("cadena")
const boton = document.getElementById("aceptar")
const p = document.getElementById("pila")
const res = document.getElementById("res")


function eventListener()
{
    boton.addEventListener("click", (e) => 
    {
        e.preventDefault();
        process()  
    })
        
}

eventListener()
    
function process(e)
{
    let validar = cadena.value
    validar = String(validar).split("")
    let arr = [0]
    let c = []

    validar.forEach(ele => ele == "a" ? arr.push(1) : ele == "b" ? arr.push(2) : ele == "c" ? c.push(3) : arr.push(4))
    
    // Cadena vacia
    if (arr.length == 1)
        {
            arr.push("vacia")
            mensaje(arr, c)
        }
    // Pila que no termine con b
    if (arr[arr.at(-1)] == 1 || arr[arr.at(-1)] == 4) c.pop()
    
    pila(arr, c)
    
}

function mensaje(arr, c)
{
    if (arr.length > 1 || c.length > 0 ) 
        {
            res.classList = "has-text-danger "
            return res.textContent = "Cadena Invalida"
        }
        else 
        {
            res.classList = "has-text-success "

            return res.textContent = "Cadena Valida"
        }
}

function pila(arr, c)
{
    console.clear()
    p.textContent = "Z |"
    
    for (let index = 0; index <= arr.length; index++) 
    {
        setTimeout(() => 
        {
            mostrarPila(arr[index])
            if (index == arr.length)
            {
                desapilado(arr, c)
            }

        }, index * 1000);
    }
    
}

function desapilado(arr,c, b=0)
{
    p.textContent = "Z |"
    console.log("Pila :",arr)
    console.log("C :",c)
    let len = arr.length

    for (let i = 0; i <= arr.length; i++) 
    {
        mostrarPila(arr[i])
    }
    
    for (let index = len; index >= 0; index--) {


        if ((arr[index] == 2 && c.length > 0) && b == 0) 
        {
            console.log(arr[index])
            let b = 0
            const a = arr.findIndex(n => {
                if (n == index) {
                    arr[n - 1] == 1 ? b = 1 : b = 0
                }
            })
            arr.pop()
            c.pop()

            if (index == 1 && arr.length == 1) {
                return res.textContent = "Cadena Invalida"
            }
            setTimeout(() => 
            {
                return desapilado(arr, c, b)
            }, index * 1000);
        }
        else if ((arr[index] == 1 && c.length > 0) && b == 1) 
        {
            console.log(arr[index])
            arr.pop()
            c.pop()
            setTimeout(() => 
            {
                if (index - 1 == 0) mensaje(arr, c)
                return desapilado(arr, c, b = 1)
            }, index * 1000);
        }
    }

        return mensaje(arr, c)
}


function mostrarPila(ele)
{
    if(ele == 1)
    {
        p.textContent += " A |"
    }
    else if(ele == 2)
    {
        p.textContent += " B |"
    }
    else if(ele == 4)
    {
        p.textContent += "X |"
    }     
}
