<template>
    <!-- details container -->
    <section class="my-container">
        <main class="description">
            <h1 class=" pb-5">Introduction to Web development</h1>
            <article class="desc pb-10">the best course we need to enrroll no matter how things may go we need to 
            the best course we need to enrroll no matter how things may go we need to 
            the best course we need to enrroll no matter how things may go we need to </article>
            
            <article class="owner">
                <h3>Dr. Mark Benon</h3>
                <p class="facility">PHD, web development</p>
            </article>
            <article class="infos pt-10">
                    <div><span class="icon">icon</span> <span class="content">18 chapters</span> </div>
                    <div><span class="icon">icon</span> <span class="content">2 assignments</span></div>
            </article>
        </main>
        <main class="preview">
            <preview/>
        </main>
    </section>
</template>
<script>
export default {
    name:"Course-details",
    components:{
        preview:() => import ('@/components/courses/Preview')
    }
}
</script>
<style lang="scss" scoped>
section{
    background: white;
    // width:100%;
    height: 100%;
    margin: 0;
    padding: 2rem;
    padding-top:5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;


    main{
        &.description{
          padding-left: 2rem;
            
            h1{
                font-size: 3rem;
                max-width: 30rem;
            }

            .owner{
                padding-left: 6rem;
                color: #717070;;

                p{
                    margin: 0;
                    padding: 0;
                    color:#717070;
                    font-size: .8rem;
                }
            }
            .infos{
                .content{
                    color:#717070;
                    font-size: 1.1rem;
                }
            }

            .desc{
                color:#717070;
                max-width: 25rem;
            }
        }
        &.preview{
          padding-right: 5rem;
        }
    }
}
</style>