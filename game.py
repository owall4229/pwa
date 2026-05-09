import pygame
import math

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("2D Basketball Game")

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
ORANGE = (255, 165, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)

# Game variables
clock = pygame.time.Clock()
FPS = 60

# Player setup
player_pos = [100, 300]
player_speed = 5

# Ball setup
ball_pos = [120, 320]
ball_radius = 10
ball_velocity = [0, 0]
is_shooting = False
gravity = 0.5

# Hoop setup
hoop_x = 700
hoop_y = 200
hoop_width = 10
hoop_height = 80

# Game loop
running = True
while running:
    screen.fill(WHITE)
    
    # Event handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN and not is_shooting:
            # Simple shooting mechanic
            mouse_x, mouse_y = pygame.mouse.get_pos()
            dx = mouse_x - ball_pos[0]
            dy = mouse_y - ball_pos[1]
            distance = math.hypot(dx, dy)
            if distance > 0:
                ball_velocity[0] = (dx / distance) * 15
                ball_velocity[1] = (dy / distance) * 15
                is_shooting = True

    # Player movement
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]: player_pos[0] -= player_speed
    if keys[pygame.K_RIGHT]: player_pos[0] += player_speed
    if keys[pygame.K_UP]: player_pos[1] -= player_speed
    if keys[pygame.K_DOWN]: player_pos[1] += player_speed

    # Ball physics
    if is_shooting:
        ball_velocity[1] += gravity
        ball_pos[0] += ball_velocity[0]
        ball_pos[1] += ball_velocity[1]
        
        # Reset ball if out of bounds
        if ball_pos[1] > HEIGHT or ball_pos[0] > WIDTH:
            is_shooting = False
            ball_pos = [player_pos[0] + 20, player_pos[1] + 20]
            ball_velocity = [0, 0]
    else:
        # Ball moves with player
        ball_pos = [player_pos[0] + 20, player_pos[1] + 20]

    # Collision detection with hoop
    hoop_rect = pygame.Rect(hoop_x, hoop_y, hoop_width, hoop_height)
    ball_rect = pygame.Rect(ball_pos[0]-ball_radius, ball_pos[1]-ball_radius, ball_radius*2, ball_radius*2)
    
    if ball_rect.colliderect(hoop_rect):
        print("Score!")
        is_shooting = False
        ball_pos = [player_pos[0] + 20, player_pos[1] + 20]
        ball_velocity = [0, 0]

    # Drawing
    pygame.draw.circle(screen, ORANGE, (int(ball_pos[0]), int(ball_pos[1])), ball_radius) # Ball
    pygame.draw.rect(screen, RED, hoop_rect) # Hoop
    pygame.draw.circle(screen, BLUE, player_pos, 20) # Player

    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()