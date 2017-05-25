# my_first_webapp

简介：一个猜位置的小游戏

-----------------------------------

（学到第八章时）
#### 对MVC的阶段性思考：

在学习headfirst javascript这本书的第八章，做一个游戏应用，采用了MVC的设计思路，现在完成了view和model两个部分，我的一个感悟：

目前为止，我领会到的、教材想传递给我的思想是首先是面向对象，即把这个应用看作一个整体，一个对象。

然后以此基础上，把这个对象的特点想清楚，抽象出模型，即model层，模型的本质或者说目的是把这个对象（应用）模拟提炼成数据，当然这样做是为了方便计算，这是计算机的长项。

当用户使用应用（在我们看来是使用对象），状态会发生变化，反映到模型上就是对应状态或行为的数据、逻辑也会跟着变化，在这个模型数据的变化过程中，插入view层的接口，也就是在数据变化的那行代码下，插入视图层的代码，以此改变用户浏览的界面，让用户感知到自己操作引起的变化。不然，不插入视图层的话，虽然模型数据变了，应用运行了，但界面没改变，用户会以为什么都没发生。

--------------------------------------------

通过练习这个小游戏的编写，我又再一次的领会了什么是编程思维：把问题分解成多个小问题。

具体的说就是：

1. 先梳理这个问题，画出流程图，把逻辑理顺；

2. 看看这个编程领域内有没有什么设计思想，比如MVC，有合适的话可以使用；

3. 再次梳理问题，不同的是这次更加具体，把大问题的逻辑细分成多个小问题的逻辑，甚至设计好各个小问题之间可能产生的交互接口；

(以上三步就是常说的“思考占用80%时间，剩下20%才是写代码”)

4. 开始实现设计，写代码；

5. 写代码的过程中会过一遍自己梳理的逻辑，这时相当于审视自己梳理的逻辑，发现问题记录下来，对比之前的设计，找解决办法。

--------------------

在编码的过程中，我没有对每个片段先调试一下，就直接照着书本的走了。这样导致后来再已经编写了一大半的代码的情况下，我去网页上测试时才发现游戏不能正常运行。又由于之前的懒惰，这时我也不能准确地定位问题代码的位置。

这就是我得到的一个教训。之前看《Think Python》时，看到了用print作为脚手架代码，以此测试相应代码能否正常工作。当时觉得这样做很麻烦，但现在看来，这样做真的是非常非常有必要。
--------------------
