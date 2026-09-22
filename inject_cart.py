import glob

cart_html = """
<!-- Cart UI -->
<div class="cart-overlay" id="cartOverlay"></div>
<div class="order-cart" id="cartDrawer">
    <div class="cart-header">
        <h3>عربة الطلبات</h3>
        <div class="cart-icon-wrap">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count" id="cartCount">0</span>
        </div>
        <button class="cart-close-btn" id="cartCloseBtn"><i class="fas fa-times"></i></button>
    </div>
    
    <div class="cart-items" id="cartItems">
        <!-- items go here -->
    </div>
    
    <div class="cart-empty" id="cartEmpty">
        <i class="fas fa-shopping-basket"></i>
        <p>السلة فارغة</p>
        <span>أضف خدمات لتظهر هنا</span>
    </div>

    <div class="cart-footer" id="cartFooter" style="display: none;">
        <div class="cart-total">
            <span>الإجمالي:</span>
            <strong id="cartTotal">0 ر.س</strong>
        </div>
        <button class="cart-submit-btn" id="sendOrderBtn">
            <i class="fab fa-whatsapp"></i>
            إرسال الطلب واتساب
        </button>
        <button class="cart-clear-btn" id="clearCartBtn">
            <i class="fas fa-trash-alt"></i>
            إفراغ السلة
        </button>
    </div>
</div>

<button class="mobile-cart-toggle" id="mobileCartToggle" style="display: none;">
    <i class="fas fa-shopping-cart"></i>
    <span class="mobile-cart-count">0</span>
</button>

<div class="cart-toast" id="cartToast">
    <i class="fas fa-check-circle"></i>
    تمت إضافة <span class="toast-name">الخدمة</span> للسلة
</div>
"""

for file in glob.glob("*.html"):
    with open(file, "r", encoding="utf-8") as f:
        html = f.read()
    
    if 'id="cartDrawer"' not in html:
        html = html.replace("<script src=\"script.js\"></script>", cart_html + "\n<script src=\"script.js\"></script>")
        with open(file, "w", encoding="utf-8") as f:
            f.write(html)
